export const auth_constants = {
  password_redex:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
  password_msg:
    'Password must be 8-15 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character',
};
