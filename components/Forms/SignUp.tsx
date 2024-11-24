"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img src="/logo.svg" alt="logo" className="w-28" />
      </div>
      <Formik
        initialValues={{
          phone: "",
          user_name: "",
          password: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required(" شماره الزامی است ."),
          user_name: Yup.string().required(" شماره الزامی است ."),
          password: Yup.string().required("رمز عبور الزامی است ."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`,
              {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            setSubmitting(false);

            // clear form
            values.phone = "";
            values.user_name = "";
            values.password = "";

            if (res.ok) {
              // toast
              toast("حساب شما با موفقیت ایجاد شد");
            }

            router.replace("/auth/sign-in");
          } catch (error) {
            toast("خطا ! لطفا مقادیر را به درستی وارد کنید .");
          }
        }}
      >
        <Form className="w-full md:w-80 mx-auto py-10 flex flex-col gap-y-5">
          <label htmlFor="email">شماره</label>
          <Field
            name="phone"
            type="number"
            className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300"
          />
          <ErrorMessage name="phone">
            {(msg) => <div className="text-rose-500">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="user_name">user_name</label>
          <Field
            name="user_name"
            type="text"
            className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300"
          />
          <ErrorMessage name="user_name" />

          <label htmlFor="password">رمز عبور</label>
          <Field
            name="password"
            type="password"
            className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300"
          />
          <ErrorMessage name="password" />

          <button
            type="submit"
            className="bg-orange-400 rounded-xl px-10 py-2 text-white"
          >
            ثبت نام
          </button>
          <div className="flex items-center gap-x-2 justify-center">
            <span>حساب دارید؟</span>
            <Link href="/auth/sign-in" className="text-blue-500">
              ورود
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
}
