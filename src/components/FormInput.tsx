import {FieldWrapper} from '@progress/kendo-react-form';
import {Label, Hint, Error} from '@progress/kendo-react-labels';
import {Input} from '@progress/kendo-react-inputs';

export default function FormInput(fieldRenderProps: any) {
	const {
		validationMessage,
		touched,
		label,
		id,
		valid,
		disabled,
		hint,
		type,
		optional,
		max,
		value,
		...others
	} = fieldRenderProps;
	const showValidationMessage = touched && validationMessage;
	const showHint = !showValidationMessage && hint;
	const hindId = showHint ? `${id}_hint` : '';
	const errorId = showValidationMessage ? `${id}_error` : '';
	return (
		<FieldWrapper>
			<Label
				editorId={id}
				editorValid={valid}
				editorDisabled={disabled}
				optional={optional}>
				{label}
			</Label>
			<div className={'k-form-field-wrap'}>
				<Input
					valid={valid}
					type={type}
					id={id}
					disabled={disabled}
					maxlength={max}
					ariaDescribedBy={`${hindId} ${errorId}`}
					{...others}
				/>
				{showHint && <Hint id={hindId}>{hint}</Hint>}
				{showValidationMessage && (
					<Error id={errorId}>{validationMessage}</Error>
				)}
			</div>
		</FieldWrapper>
	);
}
