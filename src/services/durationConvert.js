export const trekDuration = (duration) => {
  let durationResult = 0;
  let hours = 0;
  let minutes = 0;

  if (duration < 43200) {
    hours = Math.floor(duration / 60 / 60);
    minutes = Math.floor((duration % (60 * 60)) / 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    durationResult = `${hours}h${minutes}`;
  } else {
    durationResult = `${Math.round((duration / (3600 * 24)) * 2) / 2}d`;
  }

  return durationResult;
};

export const filterTrekDuration = (duration) => {
  let durationResult = 0;
  let hours = 0;
  let minutes = 0;

  if (parseInt(duration) < 43200) {
    hours = Math.floor(duration / 60 / 60);
    minutes = Math.floor((duration % (60 * 60)) / 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    durationResult = `${hours} hours`;
  } else {
    durationResult = `${Math.round((duration / (3600 * 24)) * 2) / 2} days`;
  }

  return durationResult;
};

// export default duration;
