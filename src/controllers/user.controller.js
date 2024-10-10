import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from 'dotenv';
import {Contact} from '../models/contact.model.js';
import { House } from "../models/house.model.js";
import { Rent } from "../models/rent.house.model.js";

dotenv.config();


export const register = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        console.log("body",req.body);
         
        if (!name || !email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        // let cloudResponse, fileUri,file;
        // console.log("file",req.files)
        // if(req?.file){
        //   file = req.file;
        //  // cloudinary ayega idhar
        //   fileUri = getDataUri(file);
        //   cloudResponse = await cloudinary.uploader.upload(fileUri.content);
 
        // };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
           
        });
        console.log('account create')
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

 console.log('login:',req.body)
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        console.log("secret",process.env.JWT_SECRET)
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
     
        // Respond with token
        res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email, 
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Get user profile along with rented houses
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // User ID from the request parameters

        // Find the user by ID and populate the rentedHouses field to get house details
        const user = await User.findById(userId).populate('rentedHouses', 'address price bedrooms bathrooms size');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const updateProfile = async (req, res) => {
    console.log("user up call")
    try {
        const { name, email, resume, bio, skills } = req.body;


     console.log(resume)

       let cloudResponse, fileUri,file;
       console.log("file",req.files)
       if(req?.file){
         file = req.file;
        // cloudinary ayega idhar
         fileUri = getDataUri(file);
         cloudResponse = await cloudinary.uploader.upload(fileUri.content);

       };

       console.log(skills)

        // let skillsArray;
        // if(skills){
        //     skillsArray = skills.split(",");
        // }
        const userId = req?.id; // middleware authentication
        console.log("UserId from middleware: ", userId);
        console.log(userId)
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (name) {
            // console.log("Updating fullname: ", name);
            user.fullname = name;
          }
        if(email) user.email = email
        if(resume)  user.profile.resume = resume
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skills
      
        // 
        if(cloudResponse){
            console.log("cloudresponse: ",cloudResponse)
            user.profile.profilePhoto = cloudResponse.secure_url // save the cloudinary url
         
        }


        await user.save();
        console.log('update :',user)

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        // console.log("user: ")

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const changeEmail = async (req, res) => {
    try {
      const { newEmail, password } = req.body;
      const userId = req.id; // Assuming you have middleware to extract user ID from the token
      console.log(req.body)
  
      // Validate inputs
      if (!newEmail || !password) {
        return res.status(400).json({
          message: "New email and password are required.",
          success: false
        });
      }
  
      // Find the user by ID
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false
        });
      }
  
      // Check if the new email is already in use
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        console.log('email exist')
        return res.status(400).json({
          message: "This email is already in use.",
          success: false
        });
      }
  
      // Check if the password matches the user's current password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('incorrect pass ')
        return res.status(400).json({
          message: "Incorrect password.",
          success: false
        });
      }
  
      // Update the email
      user.email = newEmail;
      await user.save();
      console.log(user)
  
      return res.status(200).json({
        message: "Email updated successfully.",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error.",
        success: false
      });
    }
  };
  

// Admin login controller
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ADMIN_JWT_SECRET , 
            { expiresIn: '22' }
        );

        // Respond with token and user info
        res.status(200).json({ token, user: { fullname: user.fullname, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Admin registration controller
export const registerAdmin = async (req, res) => {
    const { fullname, email, phoneNumber, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new admin
        const newAdmin = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: 'admin', // Set role as 'admin'
        });

        // Save the admin user
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        // console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Retrieve all contacts from the database
        // console.log('contacts',contacts)
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export const saveContactDetails = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new contact entry
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Save to the database
        await newContact.save();
        // console.log("contact save")
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }}


    ///for house controller //

    
    export const addHouse = async (req, res) => {
        try {
            const { price, address, bedrooms, bathrooms, size, realtor } = req.body;
    
            // Log incoming request data
            console.log(req.body);
    
            let cloudResponse, fileUri, file;
    
            // Check if a file is included in the request
            if (req.file) {
                file = req.file;
                // Convert the file to a data URI for Cloudinary upload
                fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                console.log("Cloudinary Response: ", cloudResponse);
            }
    
            // Create a new house listing, including the Cloudinary URL if the upload was successful
            const newHouse = new House({
                price,
                address,
                bedrooms,
                bathrooms,
                size,
                realtor,
                imageUrl: cloudResponse ? cloudResponse.secure_url : null // Store the URL if available
            });
    
            // Save the house to the database
            await newHouse.save();
            console.log("New House: ", newHouse);
    
            // Respond with the new house data
            res.status(201).json({ message: 'House added successfully!', house: newHouse });
        } catch (error) {
            console.error("Error adding house: ", error);
            res.status(500).json({ message: 'Failed to add house', error: error.message });
        }
    };
    

    export const getHouses = async (req, res) => {
        try {
            // Retrieve all houses from the database
            const houses = await House.find({});
            
            res.status(200).json(houses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve houses', error });
        }
    }


    export const getHouseById = async (req, res) => {
        const { id } = req.params;
    
        try {
            // Find house by ID
            const house = await House.findById(id);
    
            if (!house) {
                return res.status(404).json({ message: 'House not found' });
            }
    
            res.status(200).json(house);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve house', error });
        }
    }


    export const editHouse = async (req, res) => {
        const { id } = req.params;
        const { price, address, bedrooms, bathrooms, size, realtor } = req.body;
    
        console.log("Request Body: ", req.body); // Log incoming data
    
        let cloudResponse, fileUri, file;
    
        // Check if a file is included in the request
        if (req.file) {
            file = req.file;
            // Convert the file to a data URI for Cloudinary upload
            fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            console.log("Cloudinary Response: ", cloudResponse);
        }
    
        // Fetch the existing house data
        let existingHouse;
        try {
            existingHouse = await House.findById(id);
            if (!existingHouse) {
                return res.status(404).json({ message: 'House not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve house.', error: error.message });
        }
    console.log(id, req.body)
        // Prepare updated data, keeping existing values for empty fields
        const updatedData = {
            price: price !== undefined && price !== "" ? price : existingHouse.price,
            address: address !== undefined && address !== "" ? address : existingHouse.address,
            bedrooms: bedrooms !== undefined && bedrooms !== "" ? bedrooms : existingHouse.bedrooms,
            bathrooms: bathrooms !== undefined && bathrooms !== "" ? bathrooms : existingHouse.bathrooms,
            size: size !== undefined && size !== "" ? size : existingHouse.size,
            realtor: realtor !== undefined && realtor !== "" ? realtor : existingHouse.realtor,
            imageUrl: cloudResponse ? cloudResponse?.secure_url : existingHouse.imageUrl // Keep existing image if no new image uploaded
        };
    
        console.log("Updated Data: ", updatedData); // Log the updated data
    
        try {
            const updatedHouse = await House.findByIdAndUpdate(
                id,
                updatedData,
                { new: true, runValidators: true }
            );
    
            if (!updatedHouse) {
                return res.status(404).json({ message: 'House not found or failed to update.' });
            }
    
            res.status(200).json(updatedHouse);
        } catch (error) {
            res.status(400).json({ message: 'Failed to update house.', error: error.message });
        }
    };
    
    
    export const deleteHouse =  async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletedHouse = await House.findByIdAndDelete(id);
            
            if (!deletedHouse) {
                return res.status(404).json({ message: 'House not found.' });
            }
    
            console.log('deleted')
            res.status(200).json({ message: 'House deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete house.', error: error.message });
        }
    }

 // Controller to get available houses for rent
export const getAvailableHousesForRent = async (req, res) => {
    try {
        const availableHouses = await House.find({ isRented: false });

        if (availableHouses.length === 0) {
            return res.status(404).json({ message: 'No houses available for rent' });
        }

        res.status(200).json(availableHouses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getRentedHouses =  async (req, res) => {
    try {
      const rentedHouses = await Rent.find()
        .populate('house') // Populate house details
        .populate('user');  // Populate user details
  
      if (!rentedHouses || rentedHouses.length === 0) {
        return res.status(404).json({ message: 'No rented houses found.' });
      }
      res.status(200).json(rentedHouses);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


export const rentHouse = async (req, res) => {
    const { houseId, userId, rentStartDate, rentEndDate } = req.body;
//  console.log(req.body)
    try {
        const house = await House.findById(houseId);
        const user = await User.findById(userId);

        if (!house) return res.status(404).json({ message: 'House not found' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if house is already rented
        if (house.isRented) {
            return res.status(400).json({ message: 'House is already rented' });
        }

        // Create a rent record
        const rentRecord = new Rent({
            house: houseId,
            user: userId,
            rentStartDate,
            rentEndDate
        });

        await rentRecord.save();
        // console.log('rentrecord',rentRecord)
        // Update house's rented status
        house.isRented = true;
        house.rentedBy = userId;
        await house.save();

        // Update user's rented houses
        user.rentedHouses.push(houseId);
        await user.save();
        
        console.log('House rented successfully,user',user)

        res.status(200).json({ message: 'House rented successfully', rentRecord });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




export const rentedHousesByUserId = async (req, res) => {
  try {
    const rentedHouses = await Rent.find({ user: req.params.userId })
      .populate('house') // Populate house details
      .populate('user'); // Optionally populate user details

    if (rentedHouses.length === 0) {
      return res.status(404).json({ message: 'No rented houses found for this user.' });
    }
    res.status(200).json(rentedHouses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


