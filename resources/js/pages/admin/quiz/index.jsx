import { Link, router } from "@inertiajs/react";
import Authenticated from "@/layouts/authenticated";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export default function Index({ errors, data }) {
   const [isLoading, setIsLoading] = useState(false)
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

   useEffect(() => {
      if(data != undefined){
         setIsLoading(false)
      }
   }, [data])
   

   const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true)
      router.post("/admin/quiz/", values, {
         onError: () => setIsLoading(false)
      });
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
            <div className="md:w-3/5">
               <Card>
                  <CardContent className="mt-8">
                     <form onSubmit={handleSubmit}>
                        <div className="grid w-full my-4 max-w-md items-center gap-1.5">
                           <Label>Tema Soal</Label>
                           <Input
                              type="text"
                              name="kategori"
                              disabled={isLoading}
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
                              disabled={isLoading}
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
                           <Select disabled={isLoading} onValueChange={(e) => setValues({ ...values, kesulitan: e })}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="simple">Mudah</SelectItem>
                                 <SelectItem value="middle">Sedang</SelectItem>
                                 <SelectItem value="difficult">Sulit</SelectItem>
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
                           <Select disabled={isLoading} onValueChange={(e) => setValues({ ...values, level: e })}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="elementary school">(SD) Sekolah Dasar</SelectItem>
                                 <SelectItem value="junior high school">(SMP) Sekolah Menengah Pertama</SelectItem>
                                 <SelectItem value="senior high school">(SMA) Sekolah Menengah Atas</SelectItem>
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
                              disabled={isLoading}
                           >
                              { isLoading ? 'Loading...' : 'Save'}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
            <div className="inline-block mx-4 min-h-[200px] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
            <div className="w-full">
               <Card>
                  <CardContent>{!isLoading ? (
                     <div style={{ whiteSpace: 'pre-line' }}>{(data)}</div>
                  ) : <>
                     <h1 className="font-semibold text-xl uppercase my-6">{values.kategori}</h1>
                     <div>
                     <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                        <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                           <line x1={128} y1={32} x2={128} y2={64} strokeLinecap="round" strokeLinejoin="round" strokeWidth={24} />
                           <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={24} />
                           <line x1={224} y1={128} x2={192} y2={128} strokeLinecap="round" strokeLinejoin="round" strokeWidth={24}>
                           </line>
                           <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={24} />
                           <line x1={128} y1={224} x2={128} y2={192} strokeLinecap="round" strokeLinejoin="round" strokeWidth={24}>
                           </line>
                           <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={24} />
                           <line x1={32} y1={128} x2={64} y2={128} strokeLinecap="round" strokeLinejoin="round" strokeWidth={24} />
                           <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={24}>
                           </line>
                        </svg>
                        <span className="text-4xl font-medium text-gray-500">Loading...</span>
                     </div>

                     </div>
                  </>
                  }</CardContent>
               </Card>
            </div>
         </div>
      </main>
   );
}

Index.layout = (page) => <Authenticated children={page} />;
