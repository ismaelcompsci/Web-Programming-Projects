"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef } from "react";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { Vote } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

import Post from "./Post";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({ subredditName, initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],

    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const { data } = await axios.get(query);

      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts: ExtendedPost[] =
    data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc: number, vote: Vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          // @ts-ignore  TODO: FIX
          (vote: Vote) => vote.userId === session?.user?.id || -1
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                post={post}
                currentVote={currentVote}
                votesAmt={votesAmt}
              />
            </li>
          );
        } else {
          return (
            <Post
              commentAmt={post.comments.length}
              key={post.id}
              subredditName={post.subreddit.name}
              post={post}
              currentVote={currentVote}
              votesAmt={votesAmt}
            />
          );
        }
      })}
    </ul>
  );
};

export default PostFeed;
