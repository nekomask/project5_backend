const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
productName: {type:String},
user: {type: Schema.Types.ObjectId, ref: 'User'},
color: {type:String},
frameType: {type: String },
frameHeight: {type: String},
steerTubeLength: {type: String},
forkLength: {type: String},
headTubeType: {type: String},
headTubeLength: {type: String},
forkBrand: {type: String},
forkType: {type: String},
headsetSize: {type: String},
headsetType: {type:String},
stemLength: {type:String},
stemClampSize: {type:String},
stemAngle: {type:String},
handlebarType: {type:String},
seatPostBrand: {type: String},
seatPostDiameter: {type: String},
seatPostCollar: {type: String},
seatPostLength: {type: String},
saddleBrand: {type: String},
brakeType: {type:String},
frontBrakeType: {type: String},
rearBrakeType: {type: String},
chainRingTeeth: {type: String},
chainRingBCD: {type: String},
bottomBracketSize: {type: String},
bottomBracketType: {type: String},
bottomBracketThreading: {type: String},
crankArmLength: {type: String},
spindleLength: {type: String},
cogTeeth: {type: String},
rimSize: {type: String},
tireSize: {type: String},
forkEndSpacing: {type: String},
dropoutSpacing: {type: String},
hubTypeFront: {type: String},
hubTypeRear: {type: String},
hubLengthFront: {type: String},
hubLengthRear: {type: String},
frontAxelLength: {type: String},
rearAxelLength: {type: String},
hubSpokeCountFront: {type: String},
hubSpokeCountRear: {type: String},
spokeLengthFront: {type: String},
spokeLengthRear: {type: String},
}, { timestamps: true })

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;