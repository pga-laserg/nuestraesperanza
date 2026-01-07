'use client';

type Props = {
  url: string;
};

export function FacebookVideo({ url }: Props) {
  const embedSrc = `https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(
    url,
  )}&show_text=false&width=560&t=0`;

  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '56.25%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
      }}
    >
      <iframe
        title="Facebook video"
        src={embedSrc}
        style={{ border: 'none', overflow: 'hidden', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
