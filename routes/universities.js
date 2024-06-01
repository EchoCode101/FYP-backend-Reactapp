const express = require("express");
const router = express.Router();
const SimpleData = require("../models/SimpleData");
const DetailedData = require("../models/DetailedData");
const DegreeModel = require("../models/BachelorModel");
const WorldUnies = require("../models/WorldsUnies_and_Domains");
const IntermediateModel = require("../models/IntermediateModel");
router.get("/AllUniversities/simpleData", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 20; // Default to 20 documents per page

    const count = await SimpleData.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = totalPages;

    // Fetch data based on pagination
    results.data = await SimpleData.find().limit(limit).skip(startIndex);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
router.get("/AllUniversities/detailedData", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 20; // Default to 20 documents per page

    const count = await DetailedData.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = totalPages;

    // Fetch data based on pagination
    results.data = await DetailedData.find().limit(limit).skip(startIndex);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
router.get("/AllUniversities/detailedDataAll", async (req, res) => {
  try {
    // Fetch data based on pagination
    results = await DetailedData.find();

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
router.get("/AllUniversities/detailedDataAll/:id", async (req, res) => {
  try {
    const document1Id = req.params.id;
    const document1Data = await DetailedData.findById(document1Id);

    // Find corresponding document 1 data
    const matchingDocument2 = await SimpleData.findOne({
      logo_src: document1Data.logo_src,
    });

    // Return both document 1 and document 2 data
    res.json({ document2Data: matchingDocument2, document1Data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/AllUniversities/simpleData/search", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 20; // Default to 20 documents per page
    const searchQuery = req.query.query || "";
    const locationFilter = req.query.location || "";
    const regionFilter = req.query.region || "";
    const rankFilter = req.query.rank || "";

    const query = {};

    if (searchQuery) {
      query.name = { $regex: new RegExp(searchQuery, "i") }; // Case-insensitive search
    }

    if (locationFilter) {
      query.location = { $regex: new RegExp(locationFilter, "i") }; // Case-insensitive search
    }

    if (regionFilter) {
      query.region = regionFilter;
    }

    if (rankFilter) {
      // Assume rank is stored as a string field in the database
      query.rank = rankFilter;
    }

    const count = await SimpleData.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = totalPages;

    // Fetch data based on pagination and query
    results.data = await SimpleData.find(query).limit(limit).skip(startIndex);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/degrees", async (req, res) => {
  try {
    const degrees = await DegreeModel.find();
    res.json(degrees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/intermediate", async (req, res) => {
  try {
    const intermediate = await IntermediateModel.find();
    res.json(intermediate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// router.post("/addAunisimpleData", async (req, res) => {
//   try {
//     const { name, rank, logo_src, region, location } = req.body;
//     const data = new SimpleData({
//       name,
//       rank,
//       logo_src,
//       region,
//       location,
//     });
//     const savedData = await data.save();
//     res.json(savedData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal server error");
//   }
// });

// router.post("/addAuniDetailedData", async (req, res) => {
//   try {
//     const {
//       logo_src,
//       general_info,
//       about_heading,
//       about_content,
//       uni_info_heading,
//       uni_info_admission_general,
//       uni_info_admission_bachelor,
//       uni_info_admission_master,
//       uni_info_facilities,
//       student_n_staff_total_students_data,
//       student_n_staff_international_students_data,
//       student_n_staff_total_faculty_data,
//       student_n_staff_student_life,
//       uni_info_careers,
//       tuition_fee_heading,
//       tuition_fee_domestic,
//       tuition_fee_international,
//       Rankings_n_ratings_heading,
//       Rankings_n_ratings_details,
//       Rankings_n_ratings_ranks,
//       university_link,
//       university_link_href,
//       available_programs_heading,
//       available_programs_bachelor,
//       available_programs_master_details,
//       available_programs_master,
//       available_programs_MBA,
//       available_programs_phd,
//       video_n_media,
//       campus_locations_heading,
//       campus_locations_all_locations,
//     } = req.body;
//     const data = new DetailedData({
//       logo_src,
//       general_info,
//       about_heading,
//       about_content,
//       uni_info_heading,
//       uni_info_admission_general,
//       uni_info_admission_bachelor,
//       uni_info_admission_master,
//       uni_info_facilities,
//       student_n_staff_total_students_data,
//       student_n_staff_international_students_data,
//       student_n_staff_total_faculty_data,
//       student_n_staff_student_life,
//       uni_info_careers,
//       tuition_fee_heading,
//       tuition_fee_domestic,
//       tuition_fee_international,
//       Rankings_n_ratings_heading,
//       Rankings_n_ratings_details,
//       Rankings_n_ratings_ranks,
//       university_link,
//       university_link_href,
//       available_programs_heading,
//       available_programs_bachelor,
//       available_programs_master_details,
//       available_programs_master,
//       available_programs_MBA,
//       available_programs_phd,
//       video_n_media,
//       campus_locations_heading,
//       campus_locations_all_locations,
//     });
//     const savedData = await data.save();
//     res.json(savedData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal server error");
//   }
// });
// Fetch detailed data from document 1 based on matched values
router.get("/AllUniversities/simpleData/:id", async (req, res) => {
  try {
    const document2Id = req.params.id;
    const document2Data = await SimpleData.findById(document2Id);

    // Find corresponding document 1 data
    const matchingDocument1 = await DetailedData.findOne({
      logo_src: document2Data.logo_src,
    });

    // Return both document 1 and document 2 data
    res.json({ document1Data: matchingDocument1, document2Data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to search universities by domain or name
router.get("/WorldsUnies_and_Domains", async (req, res) => {
  try {
    const { query, country, page, limit } = req.query;
    let filter = {};

    // Apply search filters if provided
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search by name
        { domains: { $regex: query, $options: "i" } }, // Case-insensitive search by domain
      ];
    }
    if (country) filter.country = country;

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    // Fetch data only if search query or country filter is provided
    const results = {};
    if (Object.keys(filter).length > 0) {
      results.totalPages = Math.ceil(
        (await WorldUnies.countDocuments(filter)) / pageSize
      );
      if (endIndex < results.totalPages * pageSize) {
        results.next = {
          page: pageNumber + 1,
          limit: pageSize,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: pageNumber - 1,
          limit: pageSize,
        };
      }

      // Fetch data based on pagination
      results.data = await WorldUnies.find(filter)
        .limit(pageSize)
        .skip(startIndex);

      res.json(results);
    } else {
      res.json([]); // Return empty array if no search criteria provided
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
