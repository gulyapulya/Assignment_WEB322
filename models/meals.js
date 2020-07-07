const meals =
{
    fakedb: [],
    initDB() {
        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-53859440--WEIGHTLOSSNBV2500x.jpg?v=1583561219",
            title: "Weight Loss Small",
            category: "Weight Loss",
            price: "145$",
            nmeals: 10,
            description: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
            top: true
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-15920cc6--MuscleGainNBV2500x.jpg?v=1583563166",
            title: "Muscle Gain Small",
            category: "Muscle Gain",
            price: "159$",
            nmeals: 12,
            description: "Higher protein and calorie portions to support your muscle gain momentum",
            top: true
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-8661c283--KETONBV2500x.jpg?v=1583563152",
            title: "Keto Small",
            category: "Keto",
            price: "159$",
            nmeals: 12,
            description: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
            top: true
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-754d17d4--FATBURNERNBV2500x.jpg?v=1583564840",
            title: "Fat Burner Small",
            category: "Fat Burner",
            price: "159$",
            nmeals: 12,
            description: "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
            top: true
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-53859440--WEIGHTLOSSNBV2500x.jpg?v=1583561219",
            title: "Weight Loss Big",
            category: "Weight Loss",
            price: "212.95$",
            nmeals: 18,
            description: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
            top: false
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-15920cc6--MuscleGainNBV2500x.jpg?v=1583563166",
            title: "Muscle Gain Big",
            category: "Muscle Gain",
            price: "212.95$",
            nmeals: 18,
            description: "Higher protein and calorie portions to support your muscle gain momentum",
            top: false
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-8661c283--KETONBV2500x.jpg?v=1583563152",
            title: "Keto Big",
            category: "Keto",
            price: "212.95$",
            nmeals: 18,
            description: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
            top: false
        });

        this.fakedb.push({
            img: "https://cdn.shopify.com/s/files/1/1758/4293/t/71/assets/pf-754d17d4--FATBURNERNBV2500x.jpg?v=1583564840",
            title: "Fat Burner Big",
            category: "Fat Burner",
            price: "212.95$",
            nmeals: 18,
            description: "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
            top: false
        });
    },

    getAll() {
        return this.fakedb;
    },

    getFeatured() {
        featuredDB = [];
        for (let i = 0; i < this.fakedb.length; i++)
            if (this.fakedb[i].top == true)
                featuredDB.push(this.fakedb[i]);
        return featuredDB;
    }
}

meals.initDB();
module.exports = meals;