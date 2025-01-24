'use client'

import Card from "@/components/Card/Card";
import Navbar from "@/components/Navbar/Navbar";
import { fetchDragonById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type DragonPage = {
  id: string
}

export default function DragonPage({ id }: DragonPage) {

  const { data: dragon } = useQuery({
    queryKey: ['fetchDragonById'],
    queryFn: () => fetchDragonById(id),
    refetchOnWindowFocus: false
  })

  return (
    <div className="container">
      <Navbar />
      <div className="center-container">
        {dragon && <Card dragon={dragon} />}
      </div>
    </div>
  );
}
