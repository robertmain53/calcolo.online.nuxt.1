export default function useCategories() {
  const categories = [
    { slug: 'electrical' },
    { slug: 'mechanical' },
    { slug: 'thermal' },
    { slug: 'hydraulic' },
    { slug: 'optical' }
  ];
  return { categories };
}
