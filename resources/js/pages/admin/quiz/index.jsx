import { Link, router } from "@inertiajs/react";
import Authenticated from "@/layouts/authenticated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Index({ errors }) {
   const [values, setValues] = useState({});

   const handleChange = (event) => {
      setValues({
         ...values,
         [event.target.name]: event.target.value,
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      router.post("/admin/quiz", values);
   };

   return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         <div className="flex justify-between">
            <div className="flex items-center">
               <h1 className="text-lg font-semibold md:text-2xl">
                  Multiple Choice Generator
               </h1>
            </div>
         </div>

         <div className="flex flex-1">
            <div className="md:w-1/3">
               <Card>
                  <CardContent className="mt-8">
                     <form onSubmit={handleSubmit}>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                           <Label htmlFor="picture">Tema</Label>
                           <Input
                              type="text"
                              name="kategori"
                              onChange={handleChange}
                           />
                           {errors?.kategori && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.kategori}{" "}
                              </div>
                           )}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                           <Label htmlFor="picture">Jumlah Soal</Label>
                           <Input
                              type="text"
                              name="kategori"
                              onChange={handleChange}
                           />
                           {errors?.kategori && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.kategori}{" "}
                              </div>
                           )}
                        </div>
                        <div className="flex justify-end">
                           <Button
                              type="submit"
                              className="mt-4 text-white w-full"
                              size="lg"
                           >
                              Save
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
            <div className="inline-block mx-4 min-h-[200px] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
            <div className="w-full">
               <Card>
                  <CardContent>
                     
                  </CardContent>
               </Card>
            </div>
         </div>
      </main>
   );
}

Index.layout = (page) => <Authenticated children={page} />;
