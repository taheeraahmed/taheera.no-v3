// Builds { image, images } from a directory + filenames.
// image is always the first file; images contains all of them.
const fromDir = (basePath, ...files) => {
  const paths = files.map((f) => `${basePath}/${f}`)
  return { image: paths[0], images: paths }
}

export const proudOfMedia = {
  graduation_speech: {
    ...fromDir('/proud_of/graduation_speech', 'graduation-speech.JPG', 'graduation-speech-2.JPEG'),
    imageAlt: 'Taheera holder tale på sin egen avgangsseremoni',
  },
  first_job: {
    ...fromDir('/proud_of/first_job', 'first-job-1.jpeg', 'first-job-2.JPG', 'first-job-3.JPG'),
    imageAlt: 'Taheera på sin første dag i sin første jobb',
  },
  graduation: {
    ...fromDir(
      '/proud_of/graduation',
      'graduation-1.jpg',
      'graduation-2.JPEG',
      'graduation-3.JPEG',
      'graduation-4.jpg',
      'graduation-5.JPEG',
      'graduation-6.JPEG',
      'graduation-7.JPEG',
      'graduation-8.JPEG',
    ),
    imageAlt: 'Taheera på sin egen avgangsseremoni',
  },
  my_internships: {
    ...fromDir('/proud_of/internships', 'internships-1.JPEG', 'internships-2.png', 'internships-3.JPEG'),
    imageAlt: 'Taheera på sin første dag i sin første internship',
  },
  first_half_marathon: {
    ...fromDir('/proud_of/first_half_marathon', 'first-half-marathon-1.jpg', 'first-half-marathon-2.JPEG'),
    imageAlt: 'Taheera i mål på sitt første halvmaraton',
  },
  women_in_tech: {
    ...fromDir(
      '/about_me/women_in_tech',
      'women-in-tech-1.JPEG',
      'women-in-tech-2.JPEG',
      'women-in-tech-3.JPEG',
      'women-in-tech-4.JPEG',
      'women-in-tech-5.JPEG',
      'women-in-tech-6.JPG',
      'women-in-tech-7.JPEG',
      'women-in-tech-8.JPEG',
    ),
    imageAlt: 'Taheera på Women in Tech-konferansen i Oslo',
  },
}

// imageAlt is intentionally omitted here — it is translated in i18n.js
export const aboutMeMedia = {
  running: fromDir('/about_me/running', 'running-1.JPG', 'running-2.JPG', 'running-3.JPG', 'running-4.JPG'),
  in_general: fromDir('/about_me/general', 'general-1.jpg', 'general-2.jpg', 'general-3.JPEG', 'general-4.JPEG'),
  knitting: fromDir('/about_me/knitting', 'buckethat.jpg'),
  weightlifting: fromDir('/about_me/weightlifting', 'weightlifting-1.jpg', 'weightlifting-2.JPG', 'weightlifting-3.png'),
  reading: fromDir('/about_me/reading', 'lese.jpg'),
}
