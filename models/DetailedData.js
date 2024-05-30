const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailedDataSchema = new Schema({
  logo_src: {
    type: String,
    required: true,
  },
  general_info: [String],
  about_heading: String,
  about_content: String,
  uni_info_heading: String,
  uni_info_admission_general: [String],
  uni_info_admission_bachelor: [String],
  uni_info_admission_master: [String],
  uni_info_facilities: String,
  student_n_staff_total_students_data: [String],
  student_n_staff_international_students_data: [String],
  student_n_staff_total_faculty_data: [String],
  student_n_staff_student_life: String,
  uni_info_careers: String,
  tuition_fee_heading: [String],
  tuition_fee_domestic: [String],
  tuition_fee_international: [String],
  Rankings_n_ratings_heading: String,
  Rankings_n_ratings_details: String,
  Rankings_n_ratings_ranks: [String],
  university_link: String,
  university_link_href: String,
  available_programs_heading: String,
  available_programs_bachelor: [String],
  available_programs_master_details: String,
  available_programs_master: [String],
  available_programs_MBA: [String],
  available_programs_phd: [String],
  video_n_media: [String],
  campus_locations_heading: [String],
  campus_locations_all_locations: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DetailedData", detailedDataSchema);
