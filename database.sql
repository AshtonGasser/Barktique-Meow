-- DATABASE NAME postgreSQL "barktique_meow"


CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"username" VARCHAR(80) NOT NULL UNIQUE,
	"password" VARCHAR(80) NOT NULL,
	"employee_access_level" INT DEFAULT '1',
	"employee_first_name" VARCHAR(40) NOT NULL,
	"employee_last_name" VARCHAR(40) NOT NULL,
	"employee_phone_number" VARCHAR(20) NOT NULL
);

INSERT INTO "user" 
	(
		"username", "password", "employee_access_level",
		"employee_first_name", "employee_last_name", 
		"employee_phone_number"
	)
	
	VALUES
	('YouWantToBeAnAdmin?@gmail.com', 'PoPo098uidf$f', '2', 'Slimbo', 'Baggins', '777-888-9999'),
	('SureIwantTo!@gmail.com', 'YouLikeTHi$fukPass', '2', 'Gotcha', 'Money', '777-888-9999'),
	('imLowLevelemp@gmail.com', 'YouLikeTHi$fukPass', '1', 'Simmer', 'Down', '777-888-9999'),
	('howdoweallhave@gmail.com', 'YouLikeTHi$fukPass', '1', 'TheSame', 'PhoneNumber', '777-888-9999');
	
---- HASHTAG THIS! ----

CREATE TABLE "order_table" (
	"order_id" SERIAL PRIMARY KEY NOT NULL,
	"user_id_ref" INT REFERENCES "user",
	"cus_order_number" INT NOT NULL,
	"cus_first_name" VARCHAR(40) NOT NULL,
	"cus_last_name" VARCHAR(40) NOT NULL,
	"cus_phone_number" VARCHAR(20) NOT NULL,
	"cus_email" VARCHAR(100) NOT NULL,
	"cus_image" VARCHAR(500) NOT NULL,
	"cus_notes" VARCHAR(500),
	"cus_image_owner_rights" BOOLEAN DEFAULT TRUE NOT NULL,
	"cus_social_permission" BOOLEAN,
	"cus_progress_status" VARCHAR(20) DEFAULT 'Not Started',
	"cus_upload_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"cus_order_isStarted" BOOLEAN DEFAULT 'FALSE',
	"cus_error_image" BOOLEAN DEFAULT 'FALSE',
	"cus_date_issues" BOOLEAN DEFAULT 'FALSE',
	"employee_full_name" VARCHAR(100)
);

--- First insert without notes and social permissions ---

INSERT INTO "order_table" 
	(
		"cus_order_number", "cus_first_name", "cus_last_name",
		"cus_phone_number", "cus_email", "cus_image" 
	)
	
	VALUES
	('90847362', 'YouGot', 'MyPetPic?', '999-888-7777', 'hookitup@gmail.com',
	'https://static.wikia.nocookie.net/marvel_dc/images/4/4b/Batman_Vol_3_86_Textless.jpg/revision/latest?cb=20200502132734'),
	('90454362', 'Where''s', 'TheJoker', '999-444-7777', 'harleyQuinn6969@gmail.com',
	'https://upload.wikimedia.org/wikipedia/en/d/d7/Harley_Quinn_Vol_3_43_Textless.jpg')
;

--- Second insert with notes and social permissions ---

INSERT INTO "order_table" 
	(
		"cus_order_number", "cus_first_name", "cus_last_name",
		"cus_phone_number", "cus_email", "cus_image", "cus_notes",
		"cus_social_permission"
	)
	
	VALUES
	('90847360', 'WhichPet', 'IsIt?', '929-888-7777', 'takeAguess@gmail.com',
	'https://images-na.ssl-images-amazon.com/images/I/A12Zm1Dhs3L.jpg',
	'Hope You choose the right pet!', 'true'
	),
	('40454362', 'Thanos', 'Rulz', '969-426-7537', 'iDontNeedAsurfBoard@gmail.com',
	'https://static.wikia.nocookie.net/marveldatabase/images/3/3f/Thanos_%28Earth-TRN666%29_from_Thanos_Vol_2_13_001.jpg/revision/latest?cb=20180304103504', 'BEAST MODE!', 'true')
;