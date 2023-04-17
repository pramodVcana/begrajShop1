const mongoose = require('mongoose');
const slugify = require('slugify');


const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters']
    },
   price :{
    type: String,
    required: [true, "Please add a price"]
   }
      ,
      image :{
         type: String,
    required: [true, "Please add a Image"]
      }
  ,
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create bootcamp slug from the name
ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});



 

// Cascade delete courses when a bootcamp is deleted
// BootcampSchema.pre('remove', async function(next) {
//   console.log(`Courses being removed from bootcamp ${this._id}`);
//   await this.model('Course').deleteMany({ bootcamp: this._id });
//   console.log(`Reviews being removed from bootcamp ${this._id}`);
//    await this.model('Review').deleteMany({ bootcamp: this._id });
//   next();
// });

// Reverse populate with virtuals
// BootcampSchema.virtual('courses', {
//   ref: 'Course',
//   localField: '_id',
//   foreignField: 'bootcamp',
//   justOne: false
// });

module.exports = mongoose.model('Product', ProductSchema);
