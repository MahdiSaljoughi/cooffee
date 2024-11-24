import { NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await Prisma.post.findMany();
    return NextResponse.json({
      posts: posts,
      msg: "post Api GET",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error fetching posts",
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, image, created_by } = await request.json();

    if (!title || !description || !image || !created_by) {
      return NextResponse.json({
        message: "All field is required",
      });
    }
    const newPost = await Prisma.post.create({
      data: {
        title,

        description,

        image,
        created_by,
      },
    });

    return NextResponse.json({
      msg: `post ${newPost.title} with price ${newPost.title} created successfully!`,
      message: "پست جدید با موفقیت ایجاد شد",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await Prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description, image } = await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    if (!title || !description || !image) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پر کنید",
        messageEng: "Please fill in all fields",
        status: 400,
      });
    }

    const updatedPost = await Prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
      },
    });

    if (updatedPost) {
      return NextResponse.json({
        message: "با موفقیت ویرایش شد",
        messageEng: "updatedPost sucsses",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "این پست یافت نشد",
        messageEng: "post not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating post:", error);

    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    const result = await Prisma.post.delete({
      where: {
        id,
      },
    });

    if (result) {
      return NextResponse.json({
        message: "کالا با موفقیت حذف شد",
        messageEng: "post deleted successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "کالا یافت نشد",
        messageEng: "post not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}
