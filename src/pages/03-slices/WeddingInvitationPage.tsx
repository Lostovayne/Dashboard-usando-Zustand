import { WhiteCard } from '../../components';



export const WeddingInvitationPage = () => {
  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex justify-center items-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="flex flex-wrap -mx-3">
              <div className="px-3 w-full sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="block mb-3 font-medium text-[#07074D] text-base"
                  >
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                  />
                </div>
              </div>
              <div className="px-3 w-full sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="block mb-3 font-medium text-[#07074D] text-base"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                className="block mb-3 font-medium text-[#07074D] text-base"
              >
                ¿Cuántos invitados traerá?
              </label>
              <input
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min="0"
                className="border-[#e0e0e0] focus:border-[#6A64F1] bg-white focus:shadow-md px-6 py-3 border rounded-md w-full font-medium text-[#6B7280] text-base appearance-none outline-none"
              />
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="px-3 w-full sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="block mb-3 font-medium text-[#07074D] text-base"
                  >
                    Fecha de evento
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                  />
                </div>
              </div>
              <div className="px-3 w-full sm:w-1/2">
                <div className="mb-5">
                  <label
                    className="block mb-3 font-medium text-[#07074D] text-base"
                  >
                    Hora del evento
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block mb-3 font-medium text-[#07074D] text-base">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="w-5 h-5"
                  />
                  <label
                    className="pl-3 font-medium text-[#07074D] text-base"
                  >
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="w-5 h-5"
                  />
                  <label
                    className="pl-3 font-medium text-[#07074D] text-base"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
