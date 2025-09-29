import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  placeholder?: string,
  height?:number,
  maxWidth?:number,
  textArea?:number,
  label?:string,
  errorMessage?:string,
  textColor?:string
}
const  CustomTextField:FC<CustomTextFieldProps> = forwardRef(({placeholder, maxWidth, textArea, label, errorMessage, textColor = "#000", ...inputProps}:CustomTextFieldProps, ref) => {
  return (
    <>
      <TextField
      ref={ref}
      {...inputProps}
      error={!!errorMessage}
      helperText={errorMessage}
      label={label}
      variant="standard" // Removes outline & underline
      placeholder={placeholder}
      multiline={textArea ? true : false}
      minRows={textArea ?? undefined}
      maxRows={textArea ?? undefined}
      slotProps={{
        input:{
          disableUnderline: true, // Ensures no underline
          // classes: {
          //   input: placeholderClassName, // ✅ attach Tailwind class to input
          // },
          // className: placeholderClassName,
          sx: {
            border: "1px solid #ccc", // Light gray border
            borderRadius: "12px", // Rounded edges
            paddingX: 2, // Horizontal padding
            paddingY: 1, // Vertical padding
            "& input::placeholder": {
              color: 'var(--color-gray-500)', // ✅ Target input placeholder
              opacity: 1,
            },
            "& input::disabled": {
              background: 'var(--color-primary-500)', // ✅ Target input placeholder
              color: 'var(--color-dark-500)',
            },
            "& input": {
              color: 'var(--color-gray-50)', // ✅ Target input placeholder
              opacity: 1,
            },
            "&:hover": {
              borderColor: 'var(--color-gray-500)', // Darker border on hover
            },
            "&:focus-within": {
              borderColor: "var(--color-primary-500)", // Change border color when focused
            },
          },
        }
      }}
      sx={{ width: "100%", maxWidth }} // Optional width setting
    />
    </>

  );
})

export default CustomTextField;