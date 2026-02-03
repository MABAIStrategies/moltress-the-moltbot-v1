export type paths = {
  "/pair/start": {
    post: {
      responses: {
        200: {
          content: {
            "application/json": {
              pairing_code: string;
              expires_in_seconds: number;
            };
          };
        };
      };
    };
  };
  "/pair/confirm": {
    post: {
      responses: {
        200: {
          content: {
            "application/json": {
              access_token: string;
              expires_in_seconds: number;
              refresh_token?: string;
            };
          };
        };
      };
    };
  };
  "/system/info": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": {
              os: string;
              os_version: string;
              arch: string;
              cpu_cores: number;
              memory_bytes: number;
              disk_free_bytes: number;
              hostname: string;
            };
          };
        };
      };
    };
  };
  "/moltbot/status": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": {
              installed: boolean;
              running: boolean;
              version: string | null;
              service_manager: string;
              config_path: string | null;
              last_start_time: string | null;
              restart_count_24h: number;
              gateway_connected: boolean;
            };
          };
        };
      };
    };
  };
  "/logs/tail": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": {
              lines: string[];
              redacted: boolean;
            };
          };
        };
      };
    };
  };
};
