import { useMemo, useState } from "react";
import type { paths } from "@moltbot/sdk";

const API_BASE = "http://127.0.0.1:7337";

type PairStartResponse = paths["/pair/start"]["post"]["responses"]["200"]["content"]["application/json"];
type AuthTokens = paths["/pair/confirm"]["post"]["responses"]["200"]["content"]["application/json"];
type SystemInfo = paths["/system/info"]["get"]["responses"]["200"]["content"]["application/json"];
type MoltBotStatus = paths["/moltbot/status"]["get"]["responses"]["200"]["content"]["application/json"];
type LogTailResponse = paths["/logs/tail"]["get"]["responses"]["200"]["content"]["application/json"];

type StatusCardProps = {
  title: string;
  value: string;
  detail?: string;
};

function StatusCard({ title, value, detail }: StatusCardProps) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      {detail ? <div className="card-detail">{detail}</div> : null}
    </div>
  );
}

export function App() {
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState("operator-laptop");
  const [token, setToken] = useState<string | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [status, setStatus] = useState<MoltBotStatus | null>(null);
  const [logs, setLogs] = useState<LogTailResponse | null>(null);
  const [streamLines, setStreamLines] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(() => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  const handlePairStart = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pair/start`, { method: "POST" });
      const data = (await res.json()) as PairStartResponse;
      setPairingCode(data.pairing_code);
    } catch (err) {
      setError("Pairing start failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePairConfirm = async () => {
    if (!pairingCode) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pair/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pairing_code: pairingCode, device_name: deviceName })
      });
      if (!res.ok) {
        setError("Pairing confirmation failed.");
        return;
      }
      const data = (await res.json()) as AuthTokens;
      setToken(data.access_token);
    } catch (err) {
      setError("Pairing confirmation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!token) return;
    setError(null);
    setLoading(true);
    try {
      const [systemRes, statusRes, logsRes] = await Promise.all([
        fetch(`${API_BASE}/system/info`, { headers }),
        fetch(`${API_BASE}/moltbot/status`, { headers }),
        fetch(`${API_BASE}/logs/tail?lines=200&redact=true`, { headers })
      ]);

      if (!systemRes.ok || !statusRes.ok || !logsRes.ok) {
        setError("Unable to refresh data.");
        return;
      }

      setSystemInfo((await systemRes.json()) as SystemInfo);
      setStatus((await statusRes.json()) as MoltBotStatus);
      setLogs((await logsRes.json()) as LogTailResponse);
    } catch (err) {
      setError("Unable to refresh data.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStream = () => {
    if (!token) return;

    if (isStreaming) {
      setIsStreaming(false);
      return;
    }

    setIsStreaming(true);
    setStreamLines([]);
    const source = new EventSource(`${API_BASE}/logs/stream?redact=true`, { withCredentials: false });
    source.onmessage = (event) => {
      setStreamLines((prev) => [...prev.slice(-19), event.data]);
    };
    source.onerror = () => {
      source.close();
      setIsStreaming(false);
    };
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>MoltBot Ops Console</h1>
          <p>Secure pairing and read-only status for local operations.</p>
        </div>
        <button className="button secondary" onClick={handleRefresh} disabled={!token || loading}>
          Refresh status
        </button>
      </header>

      <section className="grid">
        <div className="panel">
          <h2>Pairing</h2>
          <p>Start pairing to mint a short-lived token. Pairing is loopback-only.</p>
          <div className="pairing-actions">
            <button className="button" onClick={handlePairStart} disabled={loading}>
              Generate pairing code
            </button>
            {pairingCode ? (
              <div className="pairing-code">{pairingCode}</div>
            ) : (
              <div className="pairing-code placeholder">No code yet</div>
            )}
          </div>
          <div className="pairing-confirm">
            <label>
              Device name
              <input
                value={deviceName}
                onChange={(event) => setDeviceName(event.target.value)}
                placeholder="device name"
              />
            </label>
            <button className="button" onClick={handlePairConfirm} disabled={!pairingCode || loading}>
              Confirm pairing
            </button>
          </div>
        </div>

        <div className="panel">
          <h2>System snapshot</h2>
          {systemInfo ? (
            <div className="cards">
              <StatusCard title="OS" value={systemInfo.os} detail={systemInfo.os_version} />
              <StatusCard title="Architecture" value={systemInfo.arch} />
              <StatusCard title="CPU cores" value={String(systemInfo.cpu_cores)} />
              <StatusCard title="Memory" value={`${Math.round(systemInfo.memory_bytes / 1e9)} GB`} />
              <StatusCard title="Disk free" value={`${Math.round(systemInfo.disk_free_bytes / 1e9)} GB`} />
              <StatusCard title="Hostname" value={systemInfo.hostname} />
            </div>
          ) : (
            <div className="empty">Awaiting token to load system info.</div>
          )}
        </div>

        <div className="panel">
          <h2>MoltBot status</h2>
          {status ? (
            <div className="cards">
              <StatusCard title="Installed" value={status.installed ? "Yes" : "No"} />
              <StatusCard title="Running" value={status.running ? "Yes" : "No"} />
              <StatusCard title="Version" value={status.version ?? "Unknown"} />
              <StatusCard title="Service manager" value={status.service_manager} />
              <StatusCard title="Config path" value={status.config_path ?? "Not detected"} />
              <StatusCard
                title="Gateway"
                value={status.gateway_connected ? "Connected" : "Disconnected"}
              />
            </div>
          ) : (
            <div className="empty">Awaiting token to load status.</div>
          )}
        </div>

        <div className="panel">
          <h2>Logs</h2>
          <div className="logs-actions">
            <button className="button secondary" onClick={toggleStream} disabled={!token}>
              {isStreaming ? "Stop streaming" : "Start streaming"}
            </button>
          </div>
          <div className="logs">
            {(logs?.lines ?? []).map((line) => (
              <div key={line}>{line}</div>
            ))}
            {streamLines.map((line, index) => (
              <div key={`${line}-${index}`}>{line}</div>
            ))}
          </div>
        </div>
      </section>

      {error ? <div className="toast error">{error}</div> : null}
    </div>
  );
}
