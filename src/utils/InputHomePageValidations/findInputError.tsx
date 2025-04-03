import { FieldErrors, FieldValues, FieldError } from "react-hook-form";

// Define the return type for `findInputError`
export function findInputError(
  errors: FieldErrors<FieldValues>,
  name: string
): { error: FieldError } | null {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {} as { error: FieldError });

  // Return `null` if no error was found
  return Object.keys(filtered).length ? filtered : null;
}
