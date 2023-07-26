export interface IDiscourseTopicActivity {
    xAxis: {
      type: "category";
      data: string[];
    };
    yAxis: {
      type: "value";
    };
    series: {
      data: number[];
      type: "line";
    }[];
}

export interface IDiscourseTopicMetrics {
  average_replies_per_topic: number;
  total_topics: number;
  total_posts: number;
  average_views_per_topic: number;
  average_post_per_topic: number;
  average_likes_per_topic: number;
  total_replies: number;
  total_views: number;
  total_likes: number;
}

export interface IDiscourseUserMetrics {
  users_average_topics_entered: number;
  users_average_post_count: number;
  users_total_days_visited: number;
  users_total_topic_count: number;
  users_total_likes_given: number;
  users_average_posts_read: number;
  users_total_posts_read: number;
  users_total_topics_entered: number;
  users_average_days_visited: number;
  users_average_likes_received: number;
  users_average_topic_count: number;
  users_total_post_count: number;
  total_users: number;
  users_total_likes_received: number;
  users_average_likes_given: number;
}
  
export interface IDiscourseCategories {
  color: string;
  topics_year: number;
  topics_month: number;
  description_text: string | null;
  topic_count: number;
  topics_all_time: number;
  topics_week: number;
  num_featured_topics: number;
  topics_day: number;
  name: string;
  id: number;
  post_count: number;
  subcategories: IDiscourseCategories[];
  slug: string;
}

export interface IDiscourseTag {
  count: number;
  id: string;
  text: string;
}

export interface IDiscourseTopTopics {
  like_count: number;
  highest_post_number: number;
  posters_len: number;
  created_at: string;
  id: number;
  title: string;
  reply_count: number;
  slug: string;
  views: number;
  posts_count: number;
  last_posted_at: string;
}

export interface IDiscourseLatestTopics {
  like_count: number;
  highest_post_number: number;
  posters_len: number;
  created_at: string;
  id: number;
  title: string;
  reply_count: number;
  slug: string;
  views: number;
  posts_count: number;
  last_posted_at: string;
}

export interface IDiscourseLatestPosts {
  reads: number;
  created_at: string;
  reply_count: number;
  score: number;
  updated_at: string;
  category_id: number;
  user_id: number;
  topic_title: string;
  name: string;
  id: number;
  topic_id: number;
  quote_count: number;
  readers_count: number;
  avatar_template: string;
  topic_slug: string;
  username: string;
}

export interface IDiscourseTopUsers {
  avatar_template: string;
  days_visited: number;
  id: number;
  posts_read: number;
  likes_received: number;
  topic_count: number;
  topics_entered: number;
  likes_given: number;
  user_id: number;
  post_count: number;
  username: string;
  name: string;
}