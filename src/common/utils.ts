export const numberTransformer = {
  to: (value: number) => value,
  from: (value: string) => parseInt(value, 10),
};
