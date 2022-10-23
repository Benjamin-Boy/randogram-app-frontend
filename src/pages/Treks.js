// Imports React Properties/packages
import { useEffect } from "react";
import PropTypes from "prop-types";

// Imports React Components
import Trekcard from "../components/Trekcard/Trekcard";
import Featuring from "../components/Featuring/Featuring";

// Imports custom contexts
import { useTrekContext } from "../context/TrekContext";
import { useUserContext } from "../context/UserContext";

const Treks = ({ getSearchedTreks, theme }) => {
  const { users } = useUserContext();
  const { treks, setTreks } = useTrekContext();

  const getUserTreks = () => {
    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    if (user) {
      const userTreks = Array.from(
        new Set(user.treksDone.map((trek) => trek.id))
      );

      const filteredTreks = treks.filter((trek) => userTreks.includes(trek.id));

      setTreks(filteredTreks);
    }
  };

  console.log(treks);

  useEffect(() => {
    getUserTreks();
  }, [users]);

  return (
    <div
      className={
        theme ? "home-container theme--light" : "home-container theme--dark"
      }
    >
      <section className="home-container-trekcards">
        {getSearchedTreks(treks).map((trek) => (
          <Trekcard
            key={trek.id}
            id={trek.id}
            name={trek.attributes.name}
            region={trek.attributes.region}
            startLocation={trek.attributes.startLocation}
            endLocation={trek.attributes.endLocation}
            upElev={trek.attributes.upElev}
            downElev={trek.attributes.downElev}
            difficulty={trek.attributes.difficulty}
            duration={trek.attributes.duration}
            distance={trek.attributes.distance}
            description={trek.attributes.description}
            medias={trek.attributes.medias.data}
          />
        ))}
      </section>
      <aside className="home-container-featuring">
        <Featuring />
      </aside>
      {/* <section
        className={
          activeAvatar
            ? "home-container-navbar active"
            : "home-container-navbar"
        }
      >
        <Navbar
          activeAvatar={activeAvatar}
          theme={theme}
          filterDifficulty={filterDifficulty}
          filterDuration={filterDuration}
          durationFilter={durationFilter}
        />
      </section> */}
    </div>
  );
};

Treks.propTypes = {};

export default Treks;
