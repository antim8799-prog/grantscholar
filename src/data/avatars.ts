import scholar from '../assets/images/grantly_student_avatar_1794036376869.jpg';
import engineering from '../assets/images/avatar_student_male_1794038029090.jpg';
import innovator from '../assets/images/avatar_student_female_1794038029312.jpg';

export const avatarPresets = [
  { id: 'preset-1', name: 'Default Scholar', url: scholar },
  { id: 'preset-2', name: 'Engineering Scholar', url: engineering },
  { id: 'preset-3', name: 'Tech Innovator', url: innovator }
];

export function resolveAvatar(url?: string) {
  if (!url) return scholar;
  if (url.startsWith('/src/assets/images/')) {
    return url.includes('female') ? innovator : url.includes('male') ? engineering : scholar;
  }
  return url;
}
