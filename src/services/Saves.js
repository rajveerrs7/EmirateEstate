"use server";

import dbConnect from "@/lib/dbConnect";
import Saved from "@/models/Saved";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function SaveAgency(agency) {
  await dbConnect();
  
  const session = await getServerSession();
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let saved = await Saved.findOne({ userId: user._id });

    if (!saved) {
      saved = await Saved.create({
        userId: user._id,
        agencies: [],
        properties: [],
      });
    }

    const alreadySaved = saved.agencies.some(
      (a) => a.agencyId === agency.agencyId
    );

    if (alreadySaved) {
      return { success: true, message: "Agency already saved" };
    }
    console.log(agency)
    saved.agencies.push({
      agencyId: agency.agencyId,
      name: agency.name,
      logo: agency.logo,
      base_location: agency.base_location,
      active_agents: agency.active_agents
    });

    await saved.save();

    return { success: true, message: "Agency saved successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error saving agency" };
  }
}

export async function SaveProperty(property) {
  await dbConnect();
  
  const session = await getServerSession();
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let saved = await Saved.findOne({ userId: user._id });

    if (!saved) {
      saved = await Saved.create({
        userId: user._id,
        agencies: [],
        properties: [],
      });
    }

    const alreadySaved = saved.properties.some(
      (a) => a.propertyId === property.PropertyId
    );

    if (alreadySaved) {
      return { success: true, message: "Property already saved" };
    }
    console.log(property)
    saved.properties.push({
      propertyId: property.PropertyId,
      title: property.title,
      price: property.price,
      coverPhoto: property.coverPhoto,
      agency: property.agency,
      city: property.city,
    });

    await saved.save();

    return { success: true, message: "Property saved successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error saving agency" };
  }
}

export async function GetSavedProperties() {
  await dbConnect();
  const session = await getServerSession();
  
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const saved = await Saved.findOne({ userId: user._id });
    const res = saved?.properties || [];
    if (res.length === 0) {
      return { success: true, data: [] };
    }

    return { success: true, data: res };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching details" };
  }
}

export async function RemoveSavedAgency(agencyId) {
  await dbConnect();
  const id = Number(agencyId)
  const session = await getServerSession();
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let saved = await Saved.findOne({ userId: user._id });

    if (!saved) {
      return {success: true, message: "not present in data"}
    }

    const SavedAgency = saved.agencies.some(
      (a) => a.agencyId === id
    );

    console.log(SavedAgency);
    if(!SavedAgency) {
      return {success: true, message: "not present in data"}
    }
    
    saved.agencies = saved.agencies.filter(
      (a) => a.agencyId !== id
    );

    await saved.save();

    return { success: true, message: "Agency removed successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error removing agency" };
  }
}

export async function RemoveSavedProperty(PropertyId) {
  await dbConnect();
  const id = Number(PropertyId)
  const session = await getServerSession();
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let saved = await Saved.findOne({ userId: user._id });

    if (!saved) {
      return {success: true, message: "not present in data"}
    }

    const SavedProperty = saved.properties.some(
      (a) => a.propertyId === id
    );

    console.log(SavedProperty);
    if(!SavedProperty) {
      return {success: true, message: "not present in data"}
    }
    
    saved.properties = saved.properties.filter(
      (a) => a.propertyId !== id
    );

    await saved.save();

    return { success: true, message: "Property removed successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error removing property" };
  }
}

export async function GetSavedAgencies() {
  await dbConnect();
  const session = await getServerSession();
  
  if (!session) {
    return { success: false, message: "User not authorized" };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const saved = await Saved.findOne({ userId: user._id });
    const res = saved?.agencies || [];
    if (res.length === 0) {
      return { success: true, data: [] };
    }

    return { success: true, data: res };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching details" };
  }
}