export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const fileValidate = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Only PDF and JPG files are allowed.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'The file exceeds the maximum size of 5MB.',
    };
  }

  return { valid: true };
};

export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};