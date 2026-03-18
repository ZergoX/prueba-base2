import Image from "next/image";
import { DogosList } from './dogos/page';

export default function Home() {
  return (
    <main>


      <div className="p-10">

        <h1 className="text-2xl font-bold mb-6">
          Dogs List
        </h1>
        <DogosList/>

      </div>
      
    </main>
  );
}
