import { Stack, Chip } from '@mui/material';

interface TagListProps {
  tags: string[];
  onDelete?: (tag: string) => void;
}

export default function TagList({ tags, onDelete }: TagListProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          sx={{ minHeight: 32, lineHeight: '24px' }}
          onDelete={onDelete ? () => onDelete(tag) : undefined}
        />
      ))}
    </Stack>
  );
}
