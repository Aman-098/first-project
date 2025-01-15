export const ValidationMessage={
    required:"This field is required.",
    email:"Please enter a valid email address,.",
    minlength:(min:number)=>`Minimum length is ${min} characters`,
    maxlength:(max:number)=>`Maximum length is ${max} characters`,
    pattern: 'The input format is invalid.',

};