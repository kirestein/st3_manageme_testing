export interface BirthdatePickerProps {
  onChange: (...event: unknown[]) => void;

  onBlur?: () => void;

  value?: Date;

  name?: string;

  ref?: React.Ref<unknown>;
}
