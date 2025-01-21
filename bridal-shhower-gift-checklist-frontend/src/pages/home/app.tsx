import React, { useEffect, useState } from "react";
import bowlImage from "../../assets/bowls.png";
import coposImage from "../../assets/copos.png";
import ferroImage from "../../assets/ferro.png";
import ferro2Image from "../../assets/ferro2.png";
import forma2Image from "../../assets/forma2.png";
import formasImage from "../../assets/formas.png";
import frigideiraImage from "../../assets/frigideira.png";
import liquidificadorImage from "../../assets/liquidificador.png";
import marinexImage from "../../assets/marinex.png";
import mixerImage from "../../assets/mixer.png";
import potesImage from "../../assets/potes.png";
import pratosImage from "../../assets/pratos.png";
import pratos2Image from "../../assets/pratos2.png";
import raladorImage from "../../assets/ralador.png";
import talheresImage from "../../assets/talheres.png";
import utensiliosImage from "../../assets/utensilios.png";
import varalImage from "../../assets/varal.png";
import xicaraImage from "../../assets/xicaras.png";
import { getChecklist } from "../../usecases/get-checklist.usecase";
import { Gift } from "../../models/gift.model";
import { patchChecklistItem } from "../../usecases/patch-checklist.usecase";

const HomePage: React.FC = () => {
  const [checklist, setChecklist] = useState<Gift[]>([]);
  const [name, setName] = useState("");
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const data = await getChecklist();
        setChecklist(data);
      } catch (error) {
        console.error("Failed to fetch checklist", error);
      }
    };

    fetchChecklist();
  }, []);

  const [selectedItem, setSelectedItem] = useState<Gift | null>(null);

  function handleOpenModal(item: Gift): void {
    setSelectedItem(item);
  }

  function handleCloseModal(): void {
    setReserved(false);
    setSelectedItem(null);
  }

  const handleReserveGift = async (id: string, name?: string) => {
    if (id) {
      try {
        const updatedGift = await patchChecklistItem(id, name);
        setChecklist((prevChecklist) =>
          prevChecklist.map((item) => (item.id === id ? updatedGift! : item))
        );
        setReserved(true);
      } catch (error) {
        console.error("Failed to reserve gift", error);
      }
    }
  };

  return (
    <div
      className={`
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-[#e3e5dd]
        text-center
        p-4
      `}
    >
      <div className="max-w-2xl w-full">
        <p className="text-xl text-gray-600 font-light drop-shadow-sm mb-4">
          Gabriela e Daniel
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 drop-shadow-md">
          Lista de Presentes
        </h1>

        <p className="text-xl text-gray-600 font-light drop-shadow-sm mb-8">
          15/02/2025, 17h
        </p>

        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 drop-shadow-sm">
            Paleta de cores
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white shadow-lg mb-4"></div>
              <span className="text-sm font-bold text-gray-700">BRANCO</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#000000] shadow-lg mb-4"></div>
              <span className="text-sm font-bold text-gray-700">PRETO</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#a6a6a6] shadow-lg mb-4"></div>
              <span className="text-sm font-bold text-gray-700">CINZA</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#9eaa7c] shadow-lg mb-4"></div>
              <span className="text-sm font-bold text-gray-700">VERDE</span>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 drop-shadow-sm">
            Inspirações
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
            <img
              src={bowlImage}
              alt="Bowl Set"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={coposImage}
              alt="Glass Set"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={ferroImage}
              alt="Iron"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={ferro2Image}
              alt="Iron 2"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={forma2Image}
              alt="Baking Pan 2"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={formasImage}
              alt="Baking Pans"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={frigideiraImage}
              alt="Frying Pan"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={liquidificadorImage}
              alt="Blender"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={marinexImage}
              alt="Marinex"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={mixerImage}
              alt="Mixer"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={potesImage}
              alt="Storage Containers"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={pratosImage}
              alt="Plates"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={pratos2Image}
              alt="Plates 2"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={raladorImage}
              alt="Grater"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={talheresImage}
              alt="Cutlery"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={utensiliosImage}
              alt="Utensils"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={varalImage}
              alt="Clothesline"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
            <img
              src={xicaraImage}
              alt="Cups"
              className="h-20 object-cover rounded-lg hover:shadow-lg transition-shadow"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto mb-20 mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 drop-shadow-sm relative text-center">
            <span className="relative">Sugestões</span>
          </h2>
          <p className="text-xl text-gray-600 font-light drop-shadow-sm mb-8">
            Clique no presente que deseja dar para reservar:
          </p>

          <div className="grid md:grid-cols-2 gap-8 justify-center">
            <div>
              <ul className="space-y-3 font-medium text-gray-700">
                {checklist.map((item) => (
                  <li
                    key={item.id}
                    className={`font-bold cursor-pointer ${
                      item.reserved
                        ? "line-through cursor-not-allowed text-gray-400"
                        : ""
                    }`}
                    onClick={() => !item.reserved && handleOpenModal(item)}
                  >
                    • {item.title.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#e3e5dd] rounded-lg shadow-lg p-6 max-w-md w-full">
            {!reserved ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Voce está reservando o presente:
                </h2>

                <h3 className="text-2xl d mb-4">{selectedItem.title}</h3>
                <form className="space-y-4">
                  <div>
                    <label
                      className="block text-gray-900 text-sm font-bold mb-2 text-left"
                      htmlFor="name"
                    >
                      Seu nome:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-[#a6a6a6] text-white px-4 py-2 rounded transition w-full"
                      onClick={handleCloseModal}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-[#9eaa7c] text-white px-4 py-2 rounded transition w-full"
                      type="button"
                      onClick={() => handleReserveGift(selectedItem.id, name)}
                    >
                      Reservar
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Obrigado por participar desse momento com a gente!
                </h2>
                <button
                  className="bg-[#a6a6a6] text-white px-4 py-2 rounded transition w-full"
                  onClick={handleCloseModal}
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
