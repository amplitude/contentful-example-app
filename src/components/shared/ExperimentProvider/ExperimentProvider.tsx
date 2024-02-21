import { useState, createContext } from 'react';

interface ExperimentContextProps {
  demoExperimentMode: boolean;
  setDemoExperimentMode: (toggle: boolean) => void;
  experimentVariant: string;
  setExperimentVariant: (variant: string) => void;
}

export const ExperimentContext = createContext<ExperimentContextProps>({
  demoExperimentMode: false,
  experimentVariant: 'control',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDemoExperimentMode: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExperimentVariant: () => {},
});

export const ExperimentProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  const [demoExperimentMode, setDemoExperimentMode] = useState(false);
  const [experimentVariant, setExperimentVariant] = useState<string>('control');
  return (
    <ExperimentContext.Provider value={{ demoExperimentMode, setDemoExperimentMode, experimentVariant, setExperimentVariant }}>
      {children}
    </ExperimentContext.Provider>
  );
};
