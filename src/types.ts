import { DocumentPickerResult } from "expo-document-picker";
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
	images?: string[];
	files?: DocumentPickerResult["assets"];
	scope: ScopeOption | null;
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
	mobile: string;
	college: string;
	department: string;
};
