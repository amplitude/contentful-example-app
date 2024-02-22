import { useState, createContext, useMemo } from 'react';

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

  const userId = useMemo(() => {
     return demoExperimentMode
    ? experimentVariant === 'control'
      ? 'control@amplitude.com'
      : 'treatment@amplitude.com'
    : 'control@amplitude.com';
  }, [demoExperimentMode, experimentVariant]);

  return (
    <ExperimentContext.Provider value={{ demoExperimentMode, setDemoExperimentMode, experimentVariant, setExperimentVariant, userId }}>
      {children}
    </ExperimentContext.Provider>
  );
};
