import postData from "@/data/post.json";

export default function Page({ params }: { params: { id: number } }) {
  const post = postData.find((x) => x.id == params.id);
  if (!post) {
    return (
      <div className="h-screen">
        <span className="flex items-center justify-center fixed inset-0 text-3xl text-red-400">
          مقاله یافت نشد!
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div className="contain">
          <div className="lg:flex justify-between lg:gap-x-8">
            <div className="border dark:border-zinc-700 bg-white dark:bg-zinc-800 w-full p-4 rounded-2xl">
              <div className="flex flex-col gap-y-4 md:gap-8">
                <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                  <div className="rounded-xl bg-zinc-100 dark:bg-zinc-700 w-full md:max-w-96">
                    <div className="w-full max-w-96 mx-auto">
                      <img
                        src={post?.image}
                        alt={post?.title}
                        className="rounded-2xl w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 w-full">
                    <h1 className="font-[fontd1] md:text-xl lg:text-2xl line-clamp-2">
                      {post?.title}
                    </h1>
                    <span className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                </div>
                <div className="flex flex-col gap-y-10">
                  <div>
                    <span className="md:text-xl block mb-4">معرفی مقاله</span>
                    <p className="textcenter w-full leading-7 font-[fontd3]">
                      {post?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
