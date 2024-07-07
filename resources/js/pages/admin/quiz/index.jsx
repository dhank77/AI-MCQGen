import { Link, router } from "@inertiajs/react";
import Authenticated from "@/layouts/authenticated";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export default function Index({ errors }) {
   const [values, setValues] = useState({
      kesulitan: "",
      kategori: "",
      level: "",
      jumlah: "1",
   });

   const handleChange = (event) => {
      setValues({
         ...values,
         [event.target.name]: event.target.value,
      });
   };

   console.log(values);

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
                        <div className="grid w-full my-4 max-w-md items-center gap-1.5">
                           <Label>Tema Soal</Label>
                           <Input
                              type="text"
                              name="kategori"
                              placeholder="Kecepatan & Jarak"
                              onChange={handleChange}
                           />
                           {errors?.kategori && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.kategori}{" "}
                              </div>
                           )}
                        </div>
                        <div className="grid w-full my-4 max-w-md items-center gap-1.5">
                           <Label>Jumlah Soal</Label>
                           <Input
                              type="number"
                              min="1"
                              value={values.jumlah}
                              name="jumlah"
                              onChange={handleChange}
                           />
                           {errors?.jumlah && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.jumlah}{" "}
                              </div>
                           )}
                        </div>
                        <div className="grid w-full my-4 max-w-md items-center gap-1.5">
                           <Label>Tingkat Kesulitan</Label>
                           <Select onValueChange={(e) => setValues({ ...values, kesulitan: e })}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="mudah">Mudah</SelectItem>
                                 <SelectItem value="sedang">Sedang</SelectItem>
                                 <SelectItem value="sulit">Sulit</SelectItem>
                              </SelectContent>
                           </Select>
                           {errors?.kesulitan && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.kesulitan}{" "}
                              </div>
                           )}
                        </div>
                        <div className="grid w-full my-4 max-w-md items-center gap-1.5">
                           <Label>Tingkat Pendidikan</Label>
                           <Select onValueChange={(e) => setValues({ ...values, level: e })}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="sekolah dasar">(SD) Sekolah Dasar</SelectItem>
                                 <SelectItem value="sekolah menangah pertama">(SMP) Sekolah Menengah Pertama</SelectItem>
                                 <SelectItem value="sekolah menangah atas">(SMA) Sekolah Menengah Atas</SelectItem>
                              </SelectContent>
                           </Select>
                           {errors?.level && (
                              <div className="text-red-500">
                                 {" "}
                                 {errors.level}{" "}
                              </div>
                           )}
                        </div>
                        <div className="flex justify-end">
                           <Button
                              type="submit"
                              className="mt-4 text-white dark:text-black w-full"
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
                  <CardContent></CardContent>
               </Card>
            </div>
         </div>
      </main>
   );
}

Index.layout = (page) => <Authenticated children={page} />;
