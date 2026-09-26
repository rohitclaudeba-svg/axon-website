export interface VideoTestimonial {
  /** The YouTube video ID (the part after "v=" or after "youtu.be/"), not a full URL. */
  youtubeId: string;
  title: string;
  author?: string;
}

export const realVideos: VideoTestimonial[] = [
  {
    youtubeId: "dlNfJAWnu40",
    title: "Benefits of Group Therapy — Grow Together, Learn Together",
  },
  {
    youtubeId: "IvWCj9JjYrY",
    title: "AXON Client Testimonial",
  },
  {
    youtubeId: "62fGnl85c14",
    title: "Tunnel Walks Combined with Sensory Mats",
  },
];

/**
 * Real YouTube Shorts supplied by AXON, repeated to preview the grid with more
 * videos than currently exist — trim this back to `realVideos` once more real
 * videos are supplied.
 */
export const videoTestimonials: VideoTestimonial[] = [...realVideos, ...realVideos];
