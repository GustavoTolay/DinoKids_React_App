import { useState } from "react";

export type Alert = {
  message: string;
  color: "primary" | "danger";
};

export type UseAlert = {
  state: Alert | undefined;
  set: ({ color, message }: Alert) => void;
  close: () => void;
};

function useAlert(): UseAlert {
  const [state, setState] = useState<Alert>();

  const set = ({ color, message }: Alert) => setState({ color, message });

  const close = () => setState(undefined);

  return { state, set, close };
}

export default useAlert;
