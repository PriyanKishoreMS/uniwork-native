import { DocumentPickerResult } from "expo-document-picker";
import { ImagePickerResult } from "expo-image-picker";
export type ScopeOption = {
	label: string;
	value: string;
};

export type PostPageLoadingStates = {
	images: boolean | null;
	files: boolean | null;
};

export type FormData = {
	title: string;
	description: string;
	price: number;
	category: string;
	images?: ImagePickerResult["assets"];
	files?: DocumentPickerResult["assets"];
	scope: ScopeOption | null;
	expiry: string;
};

export enum TaskCategory {
	AcademicAssistance = "Academic Assistance",
	TutorHomeVirtual = "Tutor Home/Virtual",
	BooksRentBuy = "Books Rent/Buy",
	VehicleRent = "Vehicle Rent",
	DocumentPrinting = "Document Printing",
	ResumeCreation = "Resume Creation",
	JobSearchSupport = "Job Search Support",
	GroceryShopping = "Grocery Shopping",
	Fashion = "Fashion",
	SocialMedia = "Social Media",
	ITSupport = "IT Support",
	GraphicDesign = "Graphic Design",
	Delivery = "Delivery",
	RideSharing = "Ride sharing",
	CateringCooking = "Catering/Cooking",
}

export const TaskCategories = [
	"All",
	"Academic Assistance",
	"Tutor Home/Virtual",
	"Books Rent/Buy",
	"Vehicle Rent",
	"Document Printing",
	"Resume Creation",
	"Job Search Support",
	"Grocery Shopping",
	"Fashion",
	"Social Media",
	"IT Support",
	"Graphic Design",
	"Delivery",
	"Ride sharing",
	"Catering/Cooking",
];

export type tasksProps = {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	status: string;
	created_at: string;
	expiry: string;
	images?: string[];
	files?: string[];
	name: string;
	avatar: string;
	rating: number;
};

export type User = {
	name: string;
	email: string;
	mobile: string;
	college: string;
	dept: string;
	avatar?: string;
};

export type UserData = {
	user: User;
	accessToken: string;
	refreshToken: string;
};
