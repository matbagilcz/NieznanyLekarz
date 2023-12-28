import json
import random
import uuid

def generate_doctor():
    genders = ["female", "male"]
    names = {
        "female": ["Alice", "Sophia", "Emily", "Olivia", "Ava", "Mia", "Emma", "Scarlett", "Isabella", "Lily", "Chloe", "Grace", "Abigail", "Ella", "Amelia", "Hazel"],
        "male": ["John", "Michael", "Daniel", "Ethan", "Liam", "Noah", "James", "Oliver", "Henry", "William", "Benjamin", "Logan", "Alexander", "Elijah", "Mason", "Jackson"]
    }

    last_names = ["Johnson", "Miller", "Williams", "Smith", "Jones", "Brown", "Davis", "Garcia", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Hill", "Cooper", "Perez"]

    specialisations = ["Cardiology", "Pediatrics", "Dermatology", "Oncology", "Internal Medicine", "Pulmonology", "Neurology", "Orthopedics", "Gynecology", "Ophthalmology", "Urology", "Radiology", "Endocrinology", "Rheumatology", "Gastroenterology", "Hematology", "Nephrology", "Allergy and Immunology", "Infectious Disease"]

    gender = random.choice(genders)
    first_name = random.choice(names[gender])
    last_name = random.choice(last_names)
    specialisation = random.choice(specialisations)
    doctor_id = str(uuid.uuid4())
    number_of_reviews = random.randint(0, 500)
    sum_of_reviews = random.randint(int(number_of_reviews * 3.3), int(number_of_reviews * 5))
    avatar = None if random.random() < 0.33 else "avatar1" if gender == "female" else "avatar2"
    user_vote = random.randint(1,5)

    doctor = {
        "name": first_name + ' ' + last_name,
        "specialisation": specialisation,
        "ID": doctor_id,
        "numberOfReviews": number_of_reviews,
        "sumOfReviews": sum_of_reviews,
        "avatar": avatar,
        "userVote": user_vote
    }

    return doctor

def generate_doctors(num_doctors):
    doctors = [generate_doctor() for _ in range(num_doctors)]
    return doctors

def write_to_json(doctors, filename):
    with open(filename, "w") as file:
        json.dump(doctors, file, indent=2)

# Specify the number of doctors you want to generate
num_doctors = 5678

# Generate doctors
doctors = generate_doctors(num_doctors)

# Write to a JSON file
write_to_json(doctors, "doctors_generated.json")
