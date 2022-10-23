// Imports React Properties/packages
import PropTypes from "prop-types";

// Imports custom contexts
import { useFilterContext } from "../context/FilterContext";

// Imports React Components
import Trekcard from "../components/Trekcard/Trekcard";
import Featuring from "../components/Featuring/Featuring";

const Home = ({ theme }) => {
  const { filteredTreks } = useFilterContext();

  return (
    <div
      className={
        theme ? "home-container theme--light" : "home-container theme--dark"
      }
    >
      <section className="home-container-trekcards">
        {filteredTreks.length > 0 ? (
          filteredTreks.map((trek) => (
            <Trekcard
              key={trek.id}
              id={trek.id}
              name={trek.name}
              region={trek.region}
              startLocation={trek.startLocation}
              endLocation={trek.endLocation}
              upElev={trek.upElev}
              downElev={trek.downElev}
              difficulty={trek.difficulty}
              duration={trek.duration}
              distance={trek.distance}
              description={trek.description}
              medias={trek.medias}
            />
          ))
        ) : (
          <h2 className="error">No treks match these criterias...</h2>
        )}
      </section>
      <aside className="home-container-featuring">
        <Featuring />
      </aside>
    </div>
  );
};

Home.propTypes = {
  theme: PropTypes.bool.isRequired,
};

export default Home;
