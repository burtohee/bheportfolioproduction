export async function postRequest(url, headers, data) {
    let result = { states: null, response: null };

    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('foo');
        }, 300);
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
        // .then((response) => {
        // console.log(response)
        if (response.ok) {
            result.states = 200;
            result.response = await response.json();
            return result;
        } else {
            throw new Error(response.status);
        }
        // })
        // .then((data) =>
        // {
        //     // this.setState({ isLoading: false, downlines: data.response });
        //     console.log("DATA STORED");
        // })
        // .catch((error) => {
        // console.log('error: ' + error);
        // return result;
        // this.setState({ requestFailed: true });
        // });
        // console.log(result)

        //     if (response.ok) {

        //         result.states = 200

        //         return result
        //         setSuccess(true);

        //         setTimeout(() => {
        //             setSuccess(false);
        //         }, 5000); // 5000 ms = 5 seconds
        //         // console.log(23);
        //         // setResponseMessage('Thank you! Your message has been sent.');
        //         // setFormData({ name: '', email: '', message: '' });

        //         methods.reset();
        //     } else {
        //         // setResponseMessage(
        //         //     'Oops! Something went wrong. Please try again.'
        //         // );
        //         return result
        //     }
    } catch (error) {
        console.log('error: ' + error);
        return result;
    }
}

export function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch('https://api.example.com/data')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error fetching data');
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
}

export async function apiClient(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API error:', error.message);
        throw error;
    }
}
