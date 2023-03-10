import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";

import { adressBack } from "./adressBack";

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { successColor, failureColor } from "../utils/index";

const RenderCards = ({ data, title, deleteImage }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card key={post._id} deleteImage={deleteImage} {...post} />
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(adressBack + "/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      toast("Impossible to fetch your images, please try later", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: failureColor,
          color: "white",
        },
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const displayToastSucces = () => {
    toast("The photo has been deleted", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: successColor,
        color: "white",
      },
    });
  };

  const displayToastFailure = () => {
    toast("Impossible to delete your image, please try later", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: failureColor,
        color: "white",
      },
    });
  };

  const deleteImage = async (_id, photo) => {
    let idCould = photo.split("/");
    idCould = idCould[idCould.length - 1];
    idCould = idCould.substring(0, idCould.length - 4);
    const objectIds = {
      idCloud: idCould,
      idDB: _id,
    };
    try {
      const response = await fetch(adressBack + "/api/v1/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectIds),
      });
      if (response.ok === true) {
        let newArray = [...allPosts];
        newArray = newArray.filter((post) => post._id !== _id);
        setAllPosts(newArray);
        displayToastSucces();
      } else {
        displayToastFailure();
      }
    } catch (err) {
      displayToastFailure();
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                  deleteImage={deleteImage}
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                  deleteImage={deleteImage}
                />
              )}
            </div>
          </>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </section>
  );
};

export default Home;
