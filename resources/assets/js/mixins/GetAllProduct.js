
import axios from 'axios'

export default  {
    methods: {
        GetAllProduct($url) {
            var self = this;
            axios.get($url)
                .then(function (response) {
                    self.Products = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
