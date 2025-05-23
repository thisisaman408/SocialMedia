import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queries";
import { useParams, Link } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(id || "");
  const handleDeletePost = () => {};
  const { user } = useUserContext();
  return (
    <div className="post_details-container">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                className="flex items-center gap-3"
                to={`/profile/${post?.creator.$id}`}
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="lg:w-12 lg:h-12 rounded-full w-8 h-8"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt || "")}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-2">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={user?.id !== post?.creator.$id ? "hidden" : ""}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    height={24}
                    width={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn${
                    user?.id !== post?.creator.$id ? "hidden" : ""
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li key={index}>#{tag}</li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              {post && <PostStats post={post} userId={user.id} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
