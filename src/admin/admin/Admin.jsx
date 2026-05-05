import { useState } from "react";

import ReturnButton from "../../components/ReturnButton";
import ReturnLogo from "../../components/ReturnLogo";
import { Footer } from "../../components/Footer";

import { AddRamalButton } from "../../components/AddRamalButton";
import { EditRamalButton } from "../../components/EditRamalButton";
import { Form } from "../../components/AddRamalForm";
import { EditarRamais } from "../../components/EditarRamalForm";

import { AddPlatformButton } from "../../components/AddPlatformButton";
import { EditPlatformButton } from "../../components/EditPlatformButton";

import { AddPlatformForm } from "../../components/AddPlatformForm";
import { EditPlatformForm } from "../../components/EditPlatformForm";

export function Admin() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isPlatformEditOpen, setIsPlatformEditOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-w-dvw w-full min-h-vdh">
      <ReturnButton />
      <ReturnLogo />

      <div className="flex gap-5 flex-wrap justify-center">
        <AddRamalButton onClick={() => setIsAddOpen(true)} />
        <EditRamalButton onClick={() => setIsEditOpen(true)} />

        <AddPlatformButton onClick={() => setIsPlatformOpen(true)} />
        <EditPlatformButton
          onClick={() => setIsPlatformEditOpen(true)}
        />
      </div>

      {/* RAMAIS */}
      <Form
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <EditarRamais
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* BOTÕES */}
      <AddPlatformForm
        isOpen={isPlatformOpen}
        onClose={() => setIsPlatformOpen(false)}
      />

      <EditPlatformForm
        isOpen={isPlatformEditOpen}
        onClose={() => setIsPlatformEditOpen(false)}
      />

      <Footer />
    </div>
  );
}