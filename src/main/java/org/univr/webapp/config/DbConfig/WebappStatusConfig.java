package org.univr.webapp.config.DbConfig;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "statusEntityManagerFactory",
        transactionManagerRef = "statusTransactionManager",
        basePackages = {"org.univr.webapp.mvc.dataAccessLayer.webappStatus", "org.univr.webapp.model.webappStatus"}
)
public class WebappStatusConfig {

    @Bean("statusDataSource")
    @ConfigurationProperties(prefix = "spring.dsstatus")
    public DataSource statusDatasource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "statusEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean statusDbEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("statusDataSource") DataSource statusDataSource
    ) {
        return builder
                .dataSource(statusDataSource)
                .packages("org.univr.webapp.dataLayer.webappStatus", "org.univr.webapp.model.webappStatus")
                .build();
    }

    @Bean(name = "statusTransactionManager")
    public PlatformTransactionManager statusDbTransactionManager(
            @Qualifier("statusEntityManagerFactory") EntityManagerFactory statusDbEntityManagerFactory
    ) {
        return new JpaTransactionManager(statusDbEntityManagerFactory);
    }
}
