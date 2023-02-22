import React from "react";

import { downloadImage } from "../utils";
import { TiDelete } from "react-icons/ti";
import { MdDownloadForOffline } from "react-icons/md";
const Card = ({ _id, name, prompt, photo, deleteImage }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
            {name[0]}
          </div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <MdDownloadForOffline
              style={{ color: "white", height: "32px", width: "32px" }}
            />
          </button>
          <button
            type="button"
            onClick={() => deleteImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <TiDelete
              style={{ color: "white", height: "40px", width: "40px" }}
            />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
