export default function formatDate(createdAt: string) {
  const formatDate = new Date(createdAt).toISOString().split('T')[0];
  return formatDate;
};