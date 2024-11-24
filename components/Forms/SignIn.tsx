"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img src="/logo.svg" alt="logo" className="w-28" />
      </div>
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required("ایمل الزامی است ."),
          password: Yup.string().required("رمز عبور الزامی است ."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const signInData = await signIn("credentials", {
            phone: values.phone,
            password: values.password,
            redirect: false,
          });
          if (signInData?.error) {
            // console.log(signInData.error);
            toast("خطا ! لطفا مقادیر را به درستی وارد کنید .");
          } else {
            setSubmitting(false);

            //clear form
            values.phone = "";
            values.password = "";
            toast("با موفقیت وارد شدید .");
            router.replace("/dashbord");
          }
        }}
      >
        <Form className="w-full md:w-80 mx-auto py-10 flex flex-col gap-y-5">
          <label htmlFor="phone">phone</label>
          <Field
            name="phone"
            type="text"
            className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300"
          />
          <ErrorMessage name="phone">
            {(msg) => <div className="text-rose-500">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="password">رمز عبور</label>
          <Field
            name="password"
            type="password"
            className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300"
          />
          <ErrorMessage name="password">
            {(msg) => <div className="text-rose-500">{msg}</div>}
          </ErrorMessage>
          <button
            type="submit"
            className="bg-orange-400 rounded-xl px-10 py-2 text-white"
          >
            ورود
          </button>
          <div className="flex items-center gap-x-2 justify-center">
            <span>حساب ندارید؟</span>
            <Link href="/auth/sign-up" className="text-blue-500">
              ثبت نام
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
}
